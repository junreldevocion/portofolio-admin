import ActiveLink from './activeLink';

const sideBar = () => {
    return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div className="position-sticky pt-3">
      <ul className="nav flex-column">
        <li className="nav-item">
			<ActiveLink href="/">
			<span data-feather="home"></span>
				Dashboard
			</ActiveLink>
        </li>
        <li className="nav-item">
			<ActiveLink href="/landing">
				<span data-feather="file"></span>
				Landing
			</ActiveLink>
        </li>
      </ul>
    </div>
  </nav>
  )
}

export default sideBar;