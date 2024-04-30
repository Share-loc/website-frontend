import Input from '../components/Input'

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 lg:px-8 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Connectez-vous
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* TODO: Lien vers la route api de connection */}
          <form className="space-y-6" action="#" method="POST">

            <Input 
                label='Adresse email'
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
            />

            <Input
                label='Mot de passe'
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
            >
                {/* TODO: Integrer le bouton mot de passe oublié */}
            </Input>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-100 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black duration-300 ease-out"
              >
                Finaliser inscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage