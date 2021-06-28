import { useRouter } from "next/router";

function ActiveLink({children, href}) {
    const router = useRouter();
    const active = router.asPath === href ? 'active' : '';

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    }

    return (
        <a href={href} className={`nav-link ${active}`} onClick={handleClick}>
            {children}
        </a>
    )
}

export default ActiveLink;