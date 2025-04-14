import About from './about';

import { getAllAbout } from '@/service/aboutService/aboutService';

export default async function Profile() {
  const aboutData = await getAllAbout();
  const about = aboutData?.data;

  return (
    <div>
      <About about={about} />
    </div>
  );
}
