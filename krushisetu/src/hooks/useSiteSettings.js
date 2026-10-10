import { useQuery } from "@tanstack/react-query";
import { getPublicSiteSettings } from "../api/siteSettingsApi.js";


const useSiteSettings = ()=> {
    return useQuery({
        queryKey : ["public-site-settings"],
        queryFn : getPublicSiteSettings,
        staleTime : 5 * 60 * 1000,
        select : (data) => data?.settings || {}
    })
}

export default useSiteSettings