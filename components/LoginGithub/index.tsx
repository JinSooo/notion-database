import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './index.module.css'

export default function LoginGithub() {
	const { data: session } = useSession()

	return (
		<div className={styles.loginContainer}>
			{session ? (
				<>
					<span>{session.user?.email}</span>
					<button className={styles.loginBtn} onClick={() => signOut()}>
						logout
					</button>
				</>
			) : (
				<button className={styles.loginBtn} onClick={() => signIn()}>
					login
				</button>
			)}
		</div>
	)
}
