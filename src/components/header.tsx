const Header: React.FC = () => {
    return (
        <div className="flex justify-between p-4 shadow-lg">
            <h1>Filmin</h1>
            <ul className="list-none flex gap-4">
                <li>Login</li>
                <li>Signin</li>
            </ul>
        </div>
    )
}

export default Header