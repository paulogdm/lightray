declare const auth0: any;

window.addEventListener('load', () => {

    function handleAuthentication(): void {
        webAuth.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                setSession(authResult);
            } else if (err) {
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }
    
    function setSession(authResult: any): void {
        const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
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
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    const webAuth = new auth0.WebAuth({
        domain: 'octobercodes.auth0.com',
        clientID: 'MSlYpUbSWbg01DPt8H4A0MmWNzVzjSy9',
        responseType: 'token id_token',
        scope: 'openid',
        redirectUri: window.location.href
    });

    const loginBtn = document.getElementById('login');

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        webAuth.authorize();
    });

});
