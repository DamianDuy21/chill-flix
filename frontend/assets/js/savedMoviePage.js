import { handleUnAuthened } from "./global.js";
import { handleResize } from "./handleResize.js";
import headerBox from "./headerBox.js";
import savedMovieRender from "./savedMovieRender.js";
import { sidebar } from "./sidebar.js";


const savedMoviePageRender = async () => {
    await handleUnAuthened()
    await headerBox()
    await sidebar()
    await handleResize()

    await savedMovieRender()



}
savedMoviePageRender()