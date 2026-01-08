import axios from "axios"
import { useEffect, useState } from "react"

const useContent = () => {
    const [contents , setContents] = useState([])

    const fetchContents = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/content", {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }
            })
            setContents(response.data.contents);
        } catch (error) {
            console.error("Error fetching contents:", error);
        }
    }

    useEffect(() => { 
        fetchContents();
    }, [])
    
    return { contents, refetch: fetchContents }
}

export default useContent