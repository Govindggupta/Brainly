import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "./Card"

interface BrainData {
    username: string;
    content?: Array<{
        _id: string;
        title: string;
        link: string;
        type: "twitter" | "youtube";
    }>;
}

const SlugPage = () => {
    const { slug } = useParams<{ slug: string }>()
    const [data, setData] = useState<BrainData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBrain = async () => {
            if (!slug) return
            
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:3000/api/v1/brain/${slug}`)
                setData(response.data)
                setError(null)
            } catch (err) {
                console.error("Error fetching brain:", err)
                setError("Failed to load brain data")
            } finally {
                setLoading(false)
            }
        }

        fetchBrain()
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        )
    }

    const content = data?.content || []

    return ( 
        <div className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                                {data?.username?.[0]?.toUpperCase() || "U"}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {data?.username || "User"}'s Brain
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Shared collection of content
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {content.length > 0 ? (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Content ({content.length})
                            </h2>
                        </div>
                        <div className="grid grid-cols-5 gap-5">
                            {content.map(({title, link, type, _id}) => (
                                <Card 
                                    key={_id} 
                                    title={title} 
                                    link={link} 
                                    type={type} 
                                    id={_id}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <div className="text-gray-400 text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No content yet
                        </h3>
                        <p className="text-gray-500">
                            This brain hasn't shared any content yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SlugPage