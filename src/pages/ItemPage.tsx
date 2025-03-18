import { useEffect, useState } from "react";
import { getToken } from "../const/func";
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
import { set } from "date-fns";

const ItemPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [existingImages, setExistingImages] = useState<
    { id: number; fullPath: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = Boolean(id);

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        const errorData = await response.json();
        console.log("An error occurred: " + errorData.message);
      }
    } catch (error) {
      console.log("An error occurred: " + error);
    }
  };

  useEffect(() => {
    fetchCategories();

    const fetchItem = async () => {
      if (!isEditing) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/items/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.body);
          setPrice(data.price.toString());
          setLocation(data.location);
          setPhone(data.phone_number);
          setShowPhone(data.show_phone);
          setCategoryId(data.category.id.toString());
          setExistingImages(data.activeItemPictures || []);
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

    fetchItem();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

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
      };

      // Première requête pour créer l'annonce
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items${isEditing ? `/${id}` : ""}`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(itemData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde de l'annonce");
      }

      const data = await response.json();

      // Si des images ont été sélectionnées
      if (images.length > 0) {
        // Ajout des images au FormData
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("pictures[]", image.file);
        });

        // Deuxième requête pour uploader les images
        const imageResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/items/${data.id}/upload-pictures`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
            body: formData,
          }
        );

        if (!imageResponse.ok) {
          throw new Error("Erreur lors de l'upload des images");
        }
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

      // Redirection vers la page home
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/item-picture/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (response.ok) {
        setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
        toast({
          title: "Image supprimée",
          variant: "success",
        });
      }
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
        <h1 className="text-3xl font-bold mb-6">Créer une nouvelle annonce</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre de l'annonce</Label>
              <Input
                id="title"
                placeholder="Ex: Perceuse électrique Bosch"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre objet en détail (état, caractéristiques, etc.)"
                className="min-h-[120px]"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="location">Lieu</Label>
                <Input
                  id="location"
                  placeholder="Ex: Paris 75011"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
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
                  onChange={(e) => setPhone(e.target.value)}
                />
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
              <Select required value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
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
