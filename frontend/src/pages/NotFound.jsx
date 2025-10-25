
function NotFound(){
    return (
    <div className="flex flex-col items-center">
            <h1 className="justify-center text-[4rem]">Not found!</h1>
            <a href="" onClick={()=>navigator.history()}>Go back!</a>
    </div>
)
}

export default NotFound;