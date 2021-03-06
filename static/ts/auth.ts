declare const auth0: any;
declare const jwt_decode: any;

window.addEventListener('load', () => {

    const btnLogin: HTMLElement = document.querySelector('#login');
    const btnLogout: HTMLElement = document.querySelector('#logout');
    const profileImg: HTMLImageElement = document.querySelector('#profile');

    function getJWTProp(name: string): string {
        return jwt_decode(localStorage.getItem("id_token"))[name];
    }

    function handleAuthentication(): void {
        webAuth.parseHash((err: string, authResult: any) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                setSession(authResult);
            }
            toggleAuthentication();
        });
    }
    
    function setSession(authResult: any): void {
        const expiresAt: string = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }
    
    function logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }
    
    function isAuthenticated(): boolean {
        try {
            const expiresAt: number = JSON.parse(localStorage.getItem('expires_at'));
            return new Date().getTime() < expiresAt;
        }
        catch(e) {
            return false;
        }
    }

    function toggleAuthentication(): void {
        if(isAuthenticated()) {
            btnLogin.style.display = "none";
            btnLogout.style.display = "inline";
            profileImg.src = getJWTProp("picture");
            profileImg.style.display = "inline";
        }
        else {
            btnLogin.style.display = "inline";
            btnLogout.style.display = "none";
            profileImg.src = null;
            profileImg.style.display = "none";
        }
    }

    const webAuth = new auth0.WebAuth({
        domain: 'octobercodes.auth0.com',
        clientID: 'MSlYpUbSWbg01DPt8H4A0MmWNzVzjSy9',
        responseType: 'token id_token',
        scope: 'openid email profile',
        redirectUri: window.location.href
    });

    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        webAuth.authorize();
    });

    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        toggleAuthentication();
    });

    handleAuthentication();

});
