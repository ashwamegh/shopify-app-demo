import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from 'js-cookie';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
	fetchOptions: {
		credentials: 'include'
	},
});

console.log(process.env.SHOPIFY_API_KEY)
const config = { apiKey:"f76b24d643f0868b82f5d21ab428be4d", shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true };

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<React.Fragment>
			<Head>
				<title>Sample App</title>
				<meta charSet="utf-8" />
			</Head>
			<Provider config={config}>
				<AppProvider i18n={translations}>
					<ApolloProvider client={client}>
						<Component {...pageProps} />
					</ApolloProvider>
				</AppProvider>
			</Provider>
			</React.Fragment>
		);
	}
}

export default MyApp;