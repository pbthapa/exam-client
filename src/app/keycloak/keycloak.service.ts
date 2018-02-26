import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare let Keycloak: any;

@Injectable()
export class KeycloakService {

	static auth: any = {};

	static init(): Promise<any> {
		const keycloakAuth: any = Keycloak({
			url: environment.keycloakRootUrl,
			realm: 'lis-exam-realm',
			clientId: 'lis-exam-client',
			'ssl-required': 'none',
			'public-client': true,
			'realm-public-key': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl1AgihZ96F9ABBPwOqSRcPxoyLMoBsUPohNxTHR2gEcZM//b0YtqnWQ87ahw1K6ZAGqNUVl5Y/T2OP3pXuL/a9ecK24Kqk053kGRYDZM/twWsMbchAsphilSCKCcH98Py7oXlqc86MrEAqYG/UxnE0OhYA7XtFgPWHvYMJvkxubOOgvBPNUcphDvGjV3bih1u8QEbrxhTyVWnQeHmo0XQFb8lRfkPK16+3Ojen+usk8nHM9GPfsmrJkiiyVy54Ju8mvMsVz+luAwbrgE1eJKGgq6LtXkXwznuy72KppglIesJxxb+W6YEGgKgdb3fluIw5t1TAK+zvn0spB7DhVMtwIDAQAB'
		});

		KeycloakService.auth.loggedIn = false;

		return new Promise((resolve, reject) => {
			keycloakAuth.init({ onLoad: 'login-required' })
				.success(() => {
					KeycloakService.auth.loggedIn = true;
					KeycloakService.auth.authz = keycloakAuth;
					KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl
						+ '/realms/lis-exam-realm/protocol/openid-connect/logout?redirect_uri='
						+ document.baseURI;
					resolve();
				})
				.error(() => {
					reject();
				});
		});
	}

	static logout() {
		console.log('**  LOGOUT');
		KeycloakService.auth.loggedIn = false;
		KeycloakService.auth.authz = null;
		window.location.href = KeycloakService.auth.logoutUrl;
	}

	static getUsername(): string {
		return KeycloakService.auth.authz.tokenParsed.preferred_username;
	}

	static getFullName(): string {
		return KeycloakService.auth.authz.tokenParsed.name;
	}

	getToken(): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			if (KeycloakService.auth.authz.token) {
				KeycloakService.auth.authz
					.updateToken(90) // refresh token if it will expire in 90s or less
					.success(() => {
						resolve(<string>KeycloakService.auth.authz.token);
					})
					.error(() => {
						reject('Failed to refresh token');
					});
			} else {
				reject('Not logged in');
			}
		});
	}

    getUserRoles(): Array<string> {
		const obj = KeycloakService.auth.authz.resourceAccess[environment.keycloakResource];
		return obj.roles;
	}
}
