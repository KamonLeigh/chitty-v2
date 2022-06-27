import { getSession, commitSession } from '~/util/cookie';
import { redirect } from '@remix-run/node';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const accessToken = formData.get('accessToken');
    const session = await getSession()
    session.set("accessToken", accessToken);

    const cookie = await commitSession(session);

    return redirect('/channels', {
        headers: {
            "Set-Cookie": cookie
        }
    })
}