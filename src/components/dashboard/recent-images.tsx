import { Tables } from "@database.types"

interface RecentImageProps{
    images:Array<Tables<"generated_images">>& {
        url:string|undefined //bcoz the image will contain the url as wel!
    }
}

const RecentImages = () => {
  return (
    <div>RecentImages</div>
  )
}

export default RecentImages