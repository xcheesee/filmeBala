import { NextPage } from "next"
import Input from "../components/Input"
import { GRADIENT_COLOR } from "../utils/constants"
import { trpc } from "../utils/trpc"

const Signup: NextPage = () => {
    return(
        <div className="w-3/6 bg-neutral-900 self-center justify-self-center rounded relative b-10" style={{
            // background: GRADIENT_COLOR,
        }}>
            <div
                className="grid grid-cols-[1fr_min-content_1fr] h-full bg-neutral-900 relative top-2 rounded-b"
            >
                <form className="flex flex-col gap-6  w-3/4 mt-32 mx-auto" id="login-form">
                    <h1 className="tracking-wider font-bold text-3xl -ml-2">Login</h1>
                    <Input id="username" name="username" label="Username" />
                    {/* <div className="flex flex-col flex-none gap-2">
                        <label htmlFor="username">
                            Username
                        </label>
                        <input id="username" name="username"/>

                    </div> */}
                    <Input id="password" name="password" label="Password" type="password"/>
                    {/* <div className="flex flex-col gap-2">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input id="password" name="password"/>
                    </div> */}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 justify-self-end rounded font-bold tracking-wider py-2 px-4">Login</button>
                    </div>
                </form>
                <div className="h-5/6 w-[3px] self-center justify-self-center" style={{
                    background: GRADIENT_COLOR
                }}></div>
                <form 
                    className="flex flex-col gap-6  w-3/4 m-auto py-8" 
                    id="signup-form"
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault()
                        const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement) as unknown as Iterable<[RequestData, FormDataEntryValue]>)
                        console.log(formData)
                        // trpc.auth.signUp.useQuery({
                        //     name: formData.name,
                        //     surname: formData.surname,
                        //     username: formData.username,

                        // })
                    }}
                >
                    <p className="tracking-wider -ml-2">Ainda nao é usuario?</p>
                    <h1 className="tracking-wider font-bold text-xl -ml-2">Cadastre-se</h1>
                    <Input name="signup-username" id="signup-username" label="Username" required />
                    <Input name="signup-password" id="signup-password" label="Password" type="password" required/>
                    <Input name="signup-pw-confirm" id="signup-pw-confirm" label="Confirm Password" type="password" />
                    <Input name="name" id="name" label="Name" required/>
                    <Input name="surname" id="surname" label="Surname" required/>
                    <Input name="surname" id="surname" label="Age" required/>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 justify-self-end rounded font-bold tracking-wider py-2 px-4 mt-4">Sign Up</button>
                    </div>
                </form>

            </div>
                {/* <input /> */}

        </div>
    )
}

export default Signup