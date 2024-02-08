import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export async function handleLogout() {
    console.log('logout initiated');
    try {
        const response = await axios.get('api/users/logout');
        console.log('logout successful');
        toast.success('Log out successful');
       // setTimeout(() => router.push('/'), 1000);
    } catch (error) {
        console.log(error.message);
        toast.error(error);
    }
}