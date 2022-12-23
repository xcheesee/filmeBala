import { type NextPage } from "next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons'
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";

const Login: NextPage = () => {
    return(
        <div 
            className="py-8 px-4 bg-neutral-800 rounded 
                       shadow-[inset_-1px_1px_6px_#404040,-1px_1px_6px_#171717]
                       self-center justify-self-center grid grid-cols-[min-content_1fr]
                       auto-rows-min gap-4" 
            style={{width: "min(700px, 100%)"}}>
                <p className="text-xl"><FontAwesomeIcon icon={faUser} /></p><input className="rounded bg-neutral-600 px-2"/>
                <p className="text-xl"><FontAwesomeIcon icon={faKey} /></p><input className="rounded bg-neutral-600 px-2" type="password"/>
                <p className="text-neutral-500 col-span-2 justify-self-center">Forgot my password</p>
                <button className="col-start-2 justify-self-end rounded bg-blue-600 font-bold py-2 px-4">Login</button>
                <div className="flex justify-center col-span-2 gap-4">
                    <button className="rounded bg-blue-600 font-bold py-2 px-4 w-24"><FontAwesomeIcon icon={faFacebook} size="2x"/></button>
                    <button className="rounded bg-red-600 font-bold py-2 px-4 w-24"><FontAwesomeIcon icon={faGoogle} size="2x"/></button>
                </div>

        </div>
    )
}

export default Login