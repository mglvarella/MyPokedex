import pokeballImage from '../assets/pokeball.png'
const Header = () =>{
    return(
        <header className="max-w-full mb-10 flex bg-primary p-4 text-3xl text-white">
            <img src={pokeballImage} alt="Pokeball" className="object-cover h-10 w-10 mr-5"/>
            <h1 className="text-3xl">MyPokedex</h1>
        </header>
    )
}
export default Header;