import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "@/types/CategoryTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical, Upload, X } from "lucide-react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import apiClient from "@/service/api/apiClient";

const itemSchema = z.object({
  title: z.string().min(1, "Veuillez saisir un titre !").max(100, "Le titre est trop long"),
  body: z.string().min(1, "Veuillez saisir une description !"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Veuillez selectionner un prix correcte !"
  }),
  location: z.string().min(1, "Veuillez saisir un lieu"),
  phone_number: z.string().regex(/^(\+[0-9]{2}|0)[0-9]{9}$/, "Veuillez saisir un format valide !"),
  show_phone: z.boolean(),
  category_id: z.string().min(1, "Veuillez sélectionner une catégorie !")
});

type ItemFormData = z.infer<typeof itemSchema>;

const ItemPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [existingImages, setExistingImages] = useState<
    { id: number; fullPath: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = Boolean(id);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ItemFormData, string>>>({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [locationCoordinates, setLocationCoordinates] = useState<[number, number] | null>(null);
  const [citySuggestions, setCitySuggestions] = useState<Array<{
    label: string;
    city: string;
    postcode:string;
    coordinates: [number, number];
  }>>([])
  const [showSuggestions, setShowSuggestions] = useState(false); 
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);
  const [phone, setPhone] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const [images, setImages] = useState<
    { id: string; file: File; preview: string }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fonction pour vérifier si la saisie manuelle correspond exactement à un résultat API
  const validateLocationWithAPI = async (locationText: string) => {
    if (!locationText.trim() || locationText.length < 3) {
      return false;
    }

    setIsCheckingLocation(true);
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(locationText)}&type=municipality&autocomplete=1&limit=10`
      );
      const data = await response.json();
      
      const exactMatch = data.features
        .filter((feature: any) => feature.properties.score >= 0.8) // Score plus élevé pour correspondance exacte
        .find((feature: any) => {
          const apiLabel = `${feature.properties.city} ${feature.properties.postcode}`;
          return apiLabel.toLowerCase() === locationText.toLowerCase();
        });

      if (exactMatch) {
        setLocationCoordinates(exactMatch.geometry.coordinates as [number, number]);
        setIsValidLocation(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Erreur lors de la validation de la ville:", error);
      return false;
    } finally {
      setIsCheckingLocation(false);
    }
  };

   const fetchCities = async (search: string) => {
    if (search.length < 3) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(search)}&type=municipality&autocomplete=1&limit=5`
      );
      const data = await response.json();
      
      const filteredSuggestions = data.features
        .filter((feature: any) => feature.properties.score >= 0.5)
        .map((feature: any) => ({
          label: `${feature.properties.city} ${feature.properties.postcode}`,
          city: feature.properties.city,
          postcode: feature.properties.postcode,
          coordinates: feature.geometry.coordinates as [number, number]
        }));
      
      setCitySuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Erreur lors de la recherche des villes:", error);
      setCitySuggestions([]);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    setIsValidLocation(false);
    setLocationCoordinates(null);
    
    // Debounce la recherche
    clearTimeout((window as any).citySearchTimeout);
    (window as any).citySearchTimeout = setTimeout(() => {
      fetchCities(value);
    }, 300);

    // Debounce la validation API pour la saisie manuelle
    clearTimeout((window as any).cityValidationTimeout);
    (window as any).cityValidationTimeout = setTimeout(() => {
      validateLocationWithAPI(value);
    }, 1000); // Plus long délai pour éviter trop de requêtes de validation
  };

  const handleCitySelect = (suggestion: any) => {
    setLocation(suggestion.label);
    setLocationCoordinates(suggestion.coordinates);
    setIsValidLocation(true);
    setShowSuggestions(false);
    validateField("location", suggestion.label);
  };

  // Fonction pour vérifier si la ville est valide
  const isLocationValid = () => {
    if (!location.trim()) return false;
    return isValidLocation && locationCoordinates !== null;
  };

  // Validation lors de la perte de focus
  const handleLocationBlur = async () => {
    if (hasAttemptedSubmit) {
      // Si pas encore validé, on force une vérification
      if (!isValidLocation && location.trim().length >= 3) {
        const isValid = await validateLocationWithAPI(location);
        if (!isValid) {
          setErrors(prev => ({ 
            ...prev, 
            location: "Ville non trouvée. Veuillez sélectionner une ville dans la liste ou vérifier l'orthographe." 
          }));
        } else {
          setErrors(prev => ({ ...prev, location: undefined }));
        }
      }
      validateField("location", location);
    }
    
    // Délai pour permettre le clic sur une suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const validateForm = (): boolean => {
    try{
      itemSchema.parse({
        title,
        body: description,
        price,
        location,
        phone_number: phone,
        show_phone: showPhone,
        category_id: categoryId
      });

      // Validation pour le lieu
      if (!isLocationValid()) {
        setErrors(prev => ({ 
          ...prev, 
          location: "Veuillez sélectionner une ville dans la liste" 
        }));
        return false;
      }

      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError){
        const newErrors: Partial<Record<keyof ItemFormData, string>> = {};
        err.errors.forEach((error) => {
          if (error.path) {
            newErrors[error.path[0] as keyof ItemFormData] = error.message;
          }
        });
        // Ajouter l'erreur de lieu si nécessaire
        if (!isLocationValid()) {
          newErrors.location = "Veuillez sélectionner une ville dans la liste";
        }
        setErrors(newErrors);
      }
      return false;
    }
  }

  const validateField = (name: keyof ItemFormData, value: string | boolean) => {
    // Ne valide que si on a déjà tenté de soumettre le formulaire
    if (!hasAttemptedSubmit) return;
  
    try {
      // Validation spéciale pour le lieu
      if (name === "location") {
        if (!value || typeof value !== "string" || !value.trim()) {
          setErrors(prev => ({ ...prev, location: "Veuillez saisir un lieu" }));
          return;
        }
        if (!isLocationValid()) {
          setErrors(prev => ({ ...prev, location: "Veuillez sélectionner une ville dans la liste" }));
          return;
        }
      }

      itemSchema.pick({ [name]: true } as Record<keyof ItemFormData, true>).parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: err.errors[0].message }));
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      return filtered;
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/categories");
      setCategories(response.data);
    } catch (error: any) {
      console.log("An error occurred: " + (error?.response?.data?.message || error.message));
    }
  };

   // Fonction pour charger les données lors de l'édition
  const loadItemForEdit = async () => {
    if (!isEditing) return;

    setIsLoading(true);
    try {
      const response = await apiClient.get(`/items/${id}`);
      const data = response.data;
      
      setTitle(data.title);
      setDescription(data.body);
      setPrice(data.price.toString());
      setLocation(data.location);
      setPhone(data.phone_number);
      setShowPhone(data.show_phone);
      setCategoryId(data.category.id.toString());
      setExistingImages(data.activeItemPictures || []);

      // Valider la ville existante
      if (data.location) {
        const isValid = await validateLocationWithAPI(data.location);
        if (isValid) {
          setIsValidLocation(true);
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'annonce:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'annonce",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    loadItemForEdit();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Validation du formulaire
    if (!validateForm()) {
      toast({
        title: "Erreur",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive",
      });
      return;
    }

    // Vérification des images
    if (
      (!isEditing && images.length === 0) ||
      (isEditing && existingImages.length === 0 && images.length === 0)
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter au moins une photo",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Ajout des données du formulaire
      const itemData = {
        title,
        body: description,
        price: parseFloat(price),
        location,
        phone_number: phone,
        show_phone: showPhone,
        category_id: parseInt(categoryId),
        ...(locationCoordinates && {
        latitude: locationCoordinates[1],
        longitude: locationCoordinates[0]
  })
      };

      // Création ou modification de l'annonce via apiClient
      let data;
      if (isEditing) {
        const response = await apiClient.put(`/items/${id}`, itemData);
        data = response.data;
      } else {
        const response = await apiClient.post("/items", itemData);
        data = response.data;
      }

      // Si des images ont été sélectionnées
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("pictures[]", image.file);
        });

        await apiClient.post(
          `/items/${data.id}/upload-pictures`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast({
        title: isEditing
          ? "Annonce modifiée avec succès !"
          : "Annonce créée avec succès !",
        description: isEditing
          ? undefined
          : "Votre annonce sera vérifiée dans un court délai.",
        variant: "success",
      });

      navigate("/");
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeExistingImage = async (imageId: number) => {
    try {
      await apiClient.delete(`/item-picture/${imageId}`);
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      toast({
        title: "Image supprimée",
        variant: "success",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'image",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing
            ? "Modification de l'annonce"
            : "Créer une nouvelle annonce"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre de l'annonce</Label>
              <Input
                id="title"
                placeholder="Ex: Perceuse électrique Bosch"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  validateField("title", e.target.value);
                }}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre objet en détail (état, caractéristiques, etc.)"
                className={cn(
                  "min-h-[120px]",
                  errors.body ? "border-red-500" : ""
                )}
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  validateField("body", e.target.value);
                }}
              />
              {errors.body && (
                <p className="text-sm text-red-500 mt-1">{errors.body}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Prix (€/jour)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="15.00"
                  required
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    validateField("price", e.target.value);
                  }}
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Lieu</Label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="Ex: Paris 75011"
                    required
                    value={location}
                    onChange={handleLocationChange}
                    onBlur={handleLocationBlur}
                    onFocus={() => {
                      if (citySuggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {/* Indicateur de vérification en cours */}
      {isCheckingLocation && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <svg className="animate-spin h-4 w-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      )}
                  {showSuggestions && citySuggestions.length > 0 && (
                    <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {citySuggestions.map((suggestion) => (
                        <li
                          key={`${suggestion.city}-${suggestion.postcode}`}
                          className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 flex justify-between items-center"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleCitySelect(suggestion);
                          }}
                        >
                          <span className="font-medium">{suggestion.city}</span>
                          <span className="text-gray-500 text-xs">
                            {suggestion.postcode}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Message d'aide si il y a des suggestions non sélectionnées */}
                  {location.length >= 3 &&
                    citySuggestions.length > 0 &&
                    !isValidLocation && (
                      <p className="text-xs text-orange-500 mt-1">
                        Veuillez sélectionner une ville dans la liste ci-dessus
                      </p>
                    )}

                  {/* Message si aucune ville trouvée */}
                  {location.length >= 3 &&
                    citySuggestions.length === 0 &&
                    showSuggestions && (
                      <p className="text-xs text-red-500 mt-1">
                        Aucune ville trouvée. Vérifiez l'orthographe.
                      </p>
                    )}
                </div>
                {errors.location && (
                  <p className="text-sm text-red-500 mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ex: 06 12 34 56 78"
                  required
                  pattern="^(\+[0-9]{2}|0)[0-9]{9}$"
                  onKeyDown={(e) => {
                    const allowedChars = /[0-9+]/;
                    if (
                      !allowedChars.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    validateField("phone_number", e.target.value);
                  }}
                  className={errors.phone_number ? "border-red-500" : ""}
                />
                {errors.phone_number && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phone_number}
                  </p>
                )}
              </div>

              <div className="flex items-end pb-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-phone"
                    checked={showPhone}
                    onCheckedChange={setShowPhone}
                  />
                  <Label htmlFor="show-phone">
                    Afficher le numéro publiquement
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select
                required
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value);
                  validateField("category_id", value);
                }}
              >
                <SelectTrigger
                  className={errors.category_id ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category_id && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.category_id}
                </p>
              )}
            </div>

            <div>
              <Label>Photos de l'objet</Label>
              <Card className="mt-2">
                <CardContent className="p-4">
                  <div className="mb-4">
                    <Label htmlFor="images" className="cursor-pointer">
                      <div
                        className={cn(
                          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors",
                          hasAttemptedSubmit &&
                            ((!isEditing && images.length === 0) ||
                              (isEditing &&
                                existingImages.length === 0 &&
                                images.length === 0))
                            ? "border-red-500"
                            : "border-border"
                        )}
                      >
                        <Upload className="h-8 w-8 mb-2" />
                        <p>
                          Cliquez pour ajouter des photos ou glissez-déposez
                        </p>
                        <p className="text-xs mt-1">
                          JPG, PNG ou GIF • Max 5 Mo par image
                        </p>
                        {hasAttemptedSubmit &&
                          ((!isEditing && images.length === 0) ||
                            (isEditing &&
                              existingImages.length === 0 &&
                              images.length === 0)) && (
                            <p className="text-xs text-red-500 mt-2">
                              Au moins une photo est requise
                            </p>
                          )}
                      </div>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  </div>

                  {(images.length > 0 || existingImages.length > 0) && (
                    <div>
                      <p className="text-sm mb-2">
                        Faites glisser pour réorganiser les images (la première
                        sera l'image principale)
                      </p>
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={[
                            ...existingImages.map((img) => img.id.toString()),
                            ...images.map((img) => img.id),
                          ]}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {existingImages.map((img) => (
                              <SortableItem
                                key={img.id}
                                id={img.id.toString()}
                                url={img.fullPath}
                                onRemove={() => removeExistingImage(img.id)}
                              />
                            ))}
                            {images.map((img) => (
                              <SortableItem
                                key={img.id}
                                id={img.id}
                                url={img.preview}
                                onRemove={() => removeImage(img.id)}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("animate-spin")}
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : isEditing ? (
              "Enregistrer les Modifications"
            ) : (
              "Créer l'annonce"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

function SortableItem({
  id,
  url,
  onRemove,
}: {
  id: string;
  url: string;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-muted rounded-md overflow-hidden group aspect-square"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 p-1 rounded-md bg-background/80 cursor-grab z-10"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 p-1 rounded-md bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <X className="h-4 w-4" />
      </button>

      <img
        src={url || "/placeholder.svg"}
        alt="Aperçu"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default ItemPage;
