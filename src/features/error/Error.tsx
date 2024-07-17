import "/src/assets/styles/error.css";
import dinoGIF from "/src/img/dinoGif.gif";
export default function Error() {
    return (
        <div className="main_div">
            <div className="error_div">
                <h1 className="error">Oops, something went wrong</h1>

                <img src={dinoGIF} alt="dino" className="error_image" />
                <a href="/" className="return_button">Return to main Page</a>
            </div>
        </div>
    )
}