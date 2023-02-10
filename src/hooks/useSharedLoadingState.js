import { useBetween } from "use-between";
import useLoadingState from "./useLoadingState";

const useSharedLoadingState = () => useBetween(useLoadingState);

export default useSharedLoadingState;