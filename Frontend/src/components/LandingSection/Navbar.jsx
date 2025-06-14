import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import logo from '@/assets/file.png' ;
import { LogIn } from 'lucide-react';
import { RouteIndex, RouteSignIn } from '@/helpers/RouteName';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { LayoutDashboard } from 'lucide-react';

const Navbar = () => {

    const user = useSelector((state) => state.user);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        setMenuOpen(false);

        if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
        className={cn(
            'fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-10',
            scrolled ? 'shadow-md backdrop-blur-lg' : 'bg-transparent'
        )}
        >
        <div className="font-roboto max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/">
            <div className="flex gap-2 justify-center items-center">
                <img className="w-9 h-9" src={logo} alt="Logo" />
                <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-darkRed to-midRed animate-fade-in">
                    SheetViz
                </h2>
            </div>
            </Link>

            { user && user.isLoggedIn ? 
                
                <>
                <Button asChild className="bg-darkRed hover:bg-white rounded-lg font-roboto text-white hover:text-darkRed ">
                    <Link to={RouteIndex} >
                        <LayoutDashboard />                   
                        Dashboard
                    </Link>
                </Button>
                </>
                :
                <>
                <Button asChild className="bg-darkRed hover:bg-white rounded-lg font-roboto text-white hover:text-darkRed ">
                    <Link to={RouteSignIn} >
                        <LogIn />                   
                        Sign In
                    </Link>
                </Button>
                </>
            }
        </div>
        </nav>
    );
};

export default Navbar;