const Container = ({ children }) =>{
    return(
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
            {children}
        </div>
    )
}
export default Container;