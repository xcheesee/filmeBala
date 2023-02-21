import { type NextPage } from "next"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../components/button"
import CircularLoader from "../components/circularLoader"
import Input from "../components/Input"
import RedirectUnauth from "../components/redirectUnauth"
import SidebarElement from "../components/sidebarElement"
import TabElement from "../components/tabElement"
import { trpc } from "../utils/trpc"

const Profile: NextPage = () => {
    const [selectedTab, setSelectedTab] = useState(0)
    const session = useSession()
    const router = useRouter()
    const userId: number | null = session.data?.user?.id === undefined ? null : +session.data?.user?.id
    const userData = trpc.user.getUser.useQuery(userId)
    const editUser = trpc.user.editInfo.useMutation()
    return(
        <RedirectUnauth>
            {
                userData.isLoading 
                    ? <div>...Carregando</div>
                    :<div className="grid grid-cols-[200px_1fr] mt-16">
                    <div className="flex flex-col gap-2 bg-neutral-900 pt-4">
                        <SidebarElement
                            tabValue={0}
                            setTab={setSelectedTab}
                        >
                            Editar
                        </SidebarElement>
                        <SidebarElement
                            tabValue={1}
                            setTab={setSelectedTab}
                        >
                            Filmes a assistir
                        </SidebarElement>
                        <SidebarElement
                            tabValue={2}
                            setTab={setSelectedTab}
                        >
                            Deletar conta
                        </SidebarElement>
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
                                    const formData = Object.fromEntries(new FormData(e.currentTarget))  as unknown as EditInfoForm
                                    editUser.mutate({...formData, id: userId, age: +formData.age})
                                }}
                            >
                            <Input name="username" id="signup_username" label="Username" required className="col-span-2" defaultValue={userData.data?.username} disabled/>
                            <Input name="name" id="name" label="Name" required defaultValue={userData.data?.name}/>
                            <Input name="surname" id="surname" label="Surname" required defaultValue={userData.data?.surname}/>
                            <Input name="age" id="age" label="Age" required className="col-span-2" defaultValue={userData.data?.age}/>
                            <div className="flex justify-end col-start-2">
                                <Button type="submit">
                                    <div className="text-neutral-700 flex gap-2 content-center">
                                        {editUser.isLoading
                                            ?<CircularLoader/> 
                                            : <></>
                                        }
                                        Editar
                                    </div>
                                </Button>
                            </div>
                            </form>
                        </TabElement>
                        <TabElement 
                            selected={selectedTab} 
                            index={1} 
                            tabHeader="A Assistir"
                        >
                            {userData.data?.watchLater?.map((ele, index) => {
                                return (
                                <div className="flex justify-around gap-4 px-4 py-8" key={`movie_to_watch_${index}`}>
                                    <div className="flex">
                                    <Image 
                                        src={ele.posterPath} 
                                        alt="movie banner"
                                        width={200}
                                        height={300}
                                        loader={({ src, width, quality }) => {
                                            return `https://image.tmdb.org/t/p/w200${src}`
                                        }}
                                    />
                                        <div className="self-center px-8">
                                            <p className="font-bold text-3xl">{ele.title}</p>
                                            <p className="pt-4">{ele.ratings.toFixed(1)}/10</p>
                                        </div>
                                    </div>
                                    <div className="self-center flex flex-col gap-4">
                                        <Button
                                            onClick={() => {
                                                router.push(`/${ele.id}`)
                                            }}
                                        >
                                            Visitar Pagina
                                        </Button>
                                        <button className="bg-red-500 rounded text-white font-bold px-4 py-2" >
                                            Remover bookmark
                                        </button>
                                    </div>
                                </div>
                                )
                            })}
                        </TabElement>
                        <TabElement
                            selected={selectedTab}
                            index={2}
                            tabHeader="Pra que isso cara?"
                        >
                            <div className="text-center py-4">Calma ai man, faça besteira nao.</div>
                        </TabElement>
                    </div>
                </div>
            }
            
        </RedirectUnauth>
    )
}

interface EditInfoForm {
    username: string;
    name: string;
    surname: string;
    age: number;
}

export default Profile