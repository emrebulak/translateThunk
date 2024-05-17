import axios from "axios";

export default axios.create({
    baseURL: "https://text-translator2.p.rapidapi.com",
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_HOST_NAME
    }
});