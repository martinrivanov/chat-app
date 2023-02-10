import { useState } from "react"

const useLoadingState = () => {
    const [isLoading, setLoading] = useState(false);

    return {
        isLoading, setLoading
    };
}

export default useLoadingState;