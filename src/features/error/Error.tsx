import "/src/assets/styles/error.css";

export default function Error() {
    return (
        <div className="main_div">
            <div className="error_div">
                <h1 className="error">Oops, something went wrong</h1>
                
                <img src="src\img\dinoGif.gif" alt="dino" className="error_image" />
                <a href="/" className="return_button">Return to main Page</a>
            </div>
        </div>
    )
}