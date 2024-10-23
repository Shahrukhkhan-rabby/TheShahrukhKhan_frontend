import { getAllAbout } from '@/service/aboutService/aboutService';
import { getAdmin } from '@/service/authService/authService';
import About from './about';

export default async function Profile() {
  const aboutData = await getAllAbout();
  const about = aboutData?.data;

  console.log(about);

  return (
    <div>
      <About about={about} />
    </div>
  );
}
