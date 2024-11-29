import HomeContent from "@/components/home/HomeContent";
import { fetchTrain } from "@/utils/api";


export default async function Home() {
const data = await fetchTrain()
  return (
    <div className="max-w-6xl mx-auto p-8">
 
        <HomeContent  data={data}/>

    </div>
  );
}
