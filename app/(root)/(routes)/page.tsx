import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";

const RootPage = async () => {
  const categories = await prismadb.category.findMany()
  console.log('cat', categories)
  return <div className='h-full p-4 space-y-2'>
    <SearchInput />

  </div>;
};

export default RootPage;
