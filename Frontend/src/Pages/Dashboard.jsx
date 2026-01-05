import {Link} from 'react-router-dom'



const Dashboard = () => {
  return (
     <div className='bg-[url("https://cdn.wallpapersafari.com/86/91/9i4pqm.jpg")] bg-cover bg-center h-screen'>
      
      <nav>
        <div className="flex gap-10 justify-end p-4 text-white text-2xl">
            <Link className="cursor-pointer hover:underline" to='/dashboard'>Home</Link>
            <Link className="cursor-pointer hover:underline" to='/contact'>Contact Us</Link>
            <Link className="cursor-pointer hover:underline" to='/'>Log out</Link>  
        </div>
      </nav>

      {/* Hero Section */}
      <div className="h-full flex flex-col items-center justify-center text-center px-4 gap-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          SkillMart
        </h1>

        <span className="text-xl md:text-2xl font-normal text-white">
          “Learn smarter. Teach better. Grow together.”
        </span>

        {/* Button at the end of text */}
        <button className="h-10 px-6 bg-amber-300 rounded font-semibold hover:bg-amber-400 transition">
          Check Courses
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
