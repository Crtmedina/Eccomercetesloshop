import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  console.log({ session })

  return (

    <div className="flex justify-center">
      <div className="w-full sm:w-[350px]">
        {children}
      </div>
    </div>
  );
}