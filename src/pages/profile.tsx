import { type NextPage } from "next"
import { useState } from "react"
import Button from "../components/button"
import CircularLoader from "../components/circularLoader"
import Input from "../components/Input"
import RedirectUnauth from "../components/redirectUnauth"
import SidebarElement from "../components/sidebarElement"
import TabElement from "../components/tabElement"
import { GRADIENT_COLOR_TOP_BOTTOM } from "../utils/constants"
import { SignUpForm } from "./sign-up"

const Profile: NextPage = () => {
    const [selectedTab, setSelectedTab] = useState(1)
    return(
        // <RedirectUnauth>
            <div className="grid grid-cols-[200px_1fr] mt-16">
                <div className="flex flex-col gap-2 bg-neutral-900 pt-4">
                    <SidebarElement
                        tabValue={0}
                        setTab={setSelectedTab}
                    >Editar</SidebarElement>
                    <SidebarElement
                        tabValue={1}
                        setTab={setSelectedTab}
                    >Filmes a assistir</SidebarElement>
                    <SidebarElement
                        tabValue={2}
                        setTab={setSelectedTab}
                    >Deletar conta</SidebarElement>
                </div>
                <div className="flex justify-center pt-4">
                    <TabElement 
                        selected={selectedTab} 
                        index={0} 
                        tabHeader="Editar Conta"
                    >
                        <form
                            className="grid grid-cols-2 gap-6  w-3/4 m-auto py-8"
                            id="signup-form"
                            autoComplete="off"
                            onSubmit={async (e) => {
                                e.preventDefault()
                                const formData = Object.fromEntries(new FormData(e.currentTarget))  as unknown as SignUpForm
                                if(formData.password !== formData.pw_confirm) {
                                    console.log('senha difere!')
                                    return
                                }
                                // signUpMutation.mutate({...formData, age: +formData.age}, {
                                //         onSuccess: () => setSignUpDialog(true),
                                //         onError: () => setSignUpErrorDialog(true),
                                        
                                //     })
                            }}
                        >
                        {/* <p className="tracking-wider -ml-2 col-span-2">Ainda nao é usuario?</p>
                        <h1 className="tracking-wider font-bold text-xl -ml-2 col-span-2">Cadastre-se</h1> */}
                        <Input name="username" id="signup_username" label="Username" required className="col-span-2"/>
                        {/* <Input name="password" id="signup_password" label="Password" type="password" required className="col-span-2"/> */}
                        {/* <Input name="pw_confirm" id="signup-pw-confirm" label="Confirm Password" type="password" className="col-span-2"/> */}
                        <Input name="name" id="name" label="Name" required/>
                        <Input name="surname" id="surname" label="Surname" required/>
                        <Input name="age" id="age" label="Age" required className="col-span-2"/>
                        <div className="flex justify-end col-start-2">
                            <Button type="submit">
                                <div className="text-neutral-700 flex gap-2 content-center">{true
                                ?<CircularLoader/> : <></>}Sign Up</div>
                            </Button>
                        </div>
                        </form>
                    </TabElement>
                    <TabElement 
                        selected={selectedTab} 
                        index={1} 
                        tabHeader="A Assistir"
                    >
                    </TabElement>
                    {/* <div className="w-3/4 h-5/6 rounded">
                    </div> */}
                </div>
            </div>
        // </RedirectUnauth>
    )
}

export default Profile