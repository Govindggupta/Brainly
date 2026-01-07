import axios from "axios"
import { useEffect, useState } from "react"

const useContent = () => {
    const [contents , setContents] = useState([])

    useEffect(() => { 
        axios.get("http://localhost:3000/api/v1/content", {
            headers: {
                "Authorization" : localStorage.getItem("token")
            }
        }).then((response) => {
            setContents(response.data.contents);
        })
    }, [])
  return contents
}

export default useContent