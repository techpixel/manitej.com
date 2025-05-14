export default function Navbar() {
    return <nav className="flex flex-row gap-2 mb-2 font-[Bitter]">
        <a href="/" className="text-white ">
            home
        </a>
        <a href="/about" className="text-white">
            about
        </a>
        <p className="text-gray-400 line-through">
            projects
        </p>
        <p className="text-gray-400 line-through">
            blog
        </p>
    </nav>
};