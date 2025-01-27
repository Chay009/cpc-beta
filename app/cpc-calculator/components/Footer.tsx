export default function Footer() {
  return (
    <div className="p-4">
      <footer className="bg-gray-50 rounded-lg py-4 text-center ">
        <div className="flex justify-center items-center space-x-2 p-4">
          <img
            src="https://framerusercontent.com/assets/rPxzXX6SLkvePv07TWveOgHq4.png"
            alt="atom11 logo"
            className="w-5 h-5 object-contain"
          />
          <span className="font-semibold text-blue-600">atom11</span>
        </div>
        <p className="text-gray-500 mt-2 text-sm border-t border-gray-200 p-4">© 2023 Relume. All rights reserved.</p>
      </footer>
    </div>
  );
}
