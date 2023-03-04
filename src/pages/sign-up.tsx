import { type NextPage } from "next"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../components/button"
import CircularLoader from "../components/circularLoader"
import Dialog from "../components/dialog"
import Input from "../components/Input"
import { GRADIENT_COLOR } from "../utils/constants"
import { trpc } from "../utils/trpc"

const Signup: NextPage = () => {
    const signUpMutation = trpc.auth.signUp.useMutation()
    const [signUpDialog, setSignUpDialog] = useState(false)
    const [signUpErrorDialog, setSignUpErrorDialog] = useState(false)
    const [notSamePw, setNotSamePw] = useState({
        triggered: false,
        message: "Senhas Diferentes!"
    })
    const router = useRouter()
    return(
        <>
            <div className="w-3/6 bg-neutral-900 self-center justify-self-center rounded relative b-10 my-20" style={{
                // background: GRADIENT_COLOR,
            }}>
                <div
                    className="grid grid-cols-[1fr_min-content_1fr] h-full bg-neutral-900 relative top-2 rounded-b"
                >
                    <form 
                        className="flex flex-col gap-6  w-3/4 m-auto"
                        id="login-form"
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const formData = Object.fromEntries(new FormData(e.currentTarget)) as unknown as LoginForm
                            await signIn("credentials", {
                                redirect: false,
                                username: formData.username,
                                password: formData.password,
                            })
                            return router.back()
                        }}
                        >
                        <h1 className="tracking-wider font-bold text-3xl -ml-2">Login</h1>
                        <Input id="username" name="username" label="Username" />
                        <Input id="password" name="password" label="Password" type="password"/>
                        <div className="flex justify-end">
                            <Button type="submit"><div className="text-neutral-700 flex gap-2 content-center">{signUpMutation.isLoading
                                ?<CircularLoader/> : <></>}Login</div></Button>
                        </div>
                    </form>
                    <div className="h-5/6 w-[3px] self-center justify-self-center" style={{
                        background: GRADIENT_COLOR
                    }}></div>
                    <form
                        className="grid grid-cols-2 gap-6  w-3/4 m-auto py-8"
                        id="signup-form"
                        autoComplete="off"
                        onSubmit={async (e) => {
                            const form: HTMLFormElement = e.target as HTMLFormElement
                            e.preventDefault()
                            setNotSamePw(prev => ({...prev, triggered: false}))
                            const formData = Object.fromEntries(new FormData(e.currentTarget))  as unknown as SignUpForm
                            if(formData.password !== formData.pw_confirm) {
                                setNotSamePw( prev => ({...prev,triggered: true,}) )
                                return
                            }
                            signUpMutation.mutate({...formData, age: +formData.age}, {
                                    onSuccess: () => {
                                        setSignUpDialog(true)
                                        form.reset()
                                    },
                                    onError: () => setSignUpErrorDialog(true),
                                    
                                })
                        }}
                    >
                        <p className="tracking-wider -ml-2 col-span-2">Ainda nao é usuario?</p>
                        <h1 className="tracking-wider font-bold text-xl -ml-2 col-span-2">Cadastre-se</h1>
                        <Input name="username" id="signup_username" label="Username" required className="col-span-2"/>
                        <div  className="flex flex-col col-span-2">
                            <Input name="password" id="signup_password" label="Password" type="password" required/>
                            <p className="text-sm font-bold">Sua senha deve conter pelo menos 1 dos seguintes:</p>
                                <div className="pl-2 text-sm flex flex-col gap-2">
                                    <p>Jogador do elenco atual do Palmeiras (Troque espacos por _)</p>
                                    <p>Animal preferido no Jogo do bixo</p>
                                    <p>Ano do rebaixamento do corinthias</p>
                                    <p>Numero do candidato pelo qual voce votou para presidencia</p>
                                </div>
                        </div>
                        <Input 
                            name="pw_confirm" 
                            id="signup-pw-confirm" 
                            label="Confirm Password" 
                            type="password" 
                            className="col-span-2" 
                            required
                            error={notSamePw}
                        />
                        <Input 
                            name="name" 
                            id="name" 
                            label="Name" 
                            required
                        />
                        <Input 
                            name="surname" 
                            id="surname" 
                            label="Surname" 
                            required
                        />
                        <Input 
                            name="age" 
                            id="age" 
                            label="Age" 
                            className="col-span-2"
                            required 
                        />
                        <div className="flex justify-end col-start-2">
                            <Button type="submit">
                                <div className="text-neutral-700 flex gap-2 content-center">
                                    {signUpMutation.isLoading
                                        ?<CircularLoader/> 
                                        : <></>
                                    }
                                    Sign Up
                                </div>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <Dialog open={signUpDialog}>
                <div className="font-bold place-content-start text-3xl text-neutral-700">Conta criada com sucesso!</div>
                <div className="self-center justify-self-center text-neutral-700 my-4">Retorne a pagina e faca seu login</div>
                <div className="justify-self-end">
                    <Button onClick={() => setSignUpDialog(false)}>
                        Ok
                    </Button>
                </div>
            </Dialog>
            <Dialog open={signUpErrorDialog}>
                <div className="font-bold place-content-start text-3xl text-neutral-700">Erro!</div>
                <div className="self-center justify-self-center text-neutral-700 my-4">{signUpMutation.error?.message}</div>
                <div className="justify-self-end">
                    <Button onClick={() => setSignUpErrorDialog(false)}>
                        Ok
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

interface SignUpForm extends LoginForm {
    name: string;
    surname: string;
    pw_confirm: string;
    age: number;

}

interface LoginForm {
    username: string;
    password: string;
}

export default Signup