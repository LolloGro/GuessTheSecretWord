function Navigation() {
  return (
    <>
      <nav className="bg-neutral-800 text-white p-6 font-bold flex">
        <img src="/CloudH50.png" alt="" />
        <div className="m-auto">
          <ul className="flex justify-evenly">
            <li className="mr-10">
              <a href="/">Home</a>
            </li>
            <li className="mr-10">
              <a href="/infopage">Gameinfo</a>
            </li>
            <li>
              <a href="/highscore">Highscore</a>
            </li>
          </ul>
        </div>
        <button>
          <img src="/menu-burger.png" alt="menu" />
        </button>
      </nav>
    </>
  );
}
export default Navigation;
