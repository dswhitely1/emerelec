import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility,
} from 'semantic-ui-react';
import Owner from '../imgs/jeremy.jpg';
import Logo from '../imgs/logo.jpg';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
	const isSSR = typeof window === 'undefined';

	return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
	<Container text>
		<Header
			as='h1'
			content='Emergency Electric'
			inverted
			style={{
				fontSize     : mobile ? '2em' : '4em',
				fontWeight   : 'normal',
				marginBottom : 0,
				marginTop    : mobile ? '1.5em' : '3em',
			}}
		/>
		<Header
			as='h2'
			content='24 Hour Service / Licensed & Insured / Residential & Commercial'
			inverted
			style={{
				fontSize   : mobile ? '1.5em' : '1.7em',
				fontWeight : 'normal',
				marginTop  : mobile ? '0.5em' : '1.5em',
			}}
		/>
		<Button primary size='huge'>
			<Icon name='phone' />
			(502) 727-4823
		</Button>
	</Container>
);

HomepageHeading.propTypes = {
	mobile : PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
	state = {};

	hideFixedMenu = () => this.setState({ fixed: false });
	showFixedMenu = () => this.setState({ fixed: true });

	render () {
		const { children } = this.props;
		const { fixed } = this.state;

		return (
			<Responsive
				getWidth={getWidth}
				minWidth={Responsive.onlyTablet.minWidth}>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}>
					<Segment
						inverted
						textAlign='center'
						style={{ minHeight: 700, padding: '1em 0em' }}
						vertical>
						<Menu
							fixed={fixed ? 'top' : null}
							inverted={!fixed}
							pointing={!fixed}
							secondary={!fixed}
							size='large'>
							<Container>
								<Menu.Item as='a' active>
									Home
								</Menu.Item>
								{/* <Menu.Item as='a'>Work</Menu.Item>
								<Menu.Item as='a'>Company</Menu.Item>
								<Menu.Item as='a'>Careers</Menu.Item> */}
								<Menu.Item position='right'>
									<Button as='a' inverted={!fixed}>
										Log in
									</Button>
									<Button
										as='a'
										inverted={!fixed}
										primary={fixed}
										style={{ marginLeft: '0.5em' }}>
										<Icon name='phone' />
										(502) 727-4823
									</Button>
								</Menu.Item>
							</Container>
						</Menu>
						<HomepageHeading />
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		);
	}
}

DesktopContainer.propTypes = {
	children : PropTypes.node,
};

class MobileContainer extends Component {
	state = {};

	handleSidebarHide = () => this.setState({ sidebarOpened: false });

	handleToggle = () => this.setState({ sidebarOpened: true });

	render () {
		const { children } = this.props;
		const { sidebarOpened } = this.state;

		return (
			<Responsive
				as={Sidebar.Pushable}
				getWidth={getWidth}
				maxWidth={Responsive.onlyMobile.maxWidth}>
				<Sidebar
					as={Menu}
					animation='push'
					inverted
					onHide={this.handleSidebarHide}
					vertical
					visible={sidebarOpened}>
					<Menu.Item as='a' active>
						Home
					</Menu.Item>
					{/* <Menu.Item as='a'>Work</Menu.Item>
					<Menu.Item as='a'>Company</Menu.Item>
					<Menu.Item as='a'>Careers</Menu.Item> */}
					<Menu.Item as='a'>Log in</Menu.Item>
					{/* <Menu.Item as='a'>Sign Up</Menu.Item> */}
				</Sidebar>

				<Sidebar.Pusher dimmed={sidebarOpened}>
					<Segment
						inverted
						textAlign='center'
						style={{ minHeight: 350, padding: '1em 0em' }}
						vertical>
						<Container>
							<Menu inverted pointing secondary size='large'>
								<Menu.Item onClick={this.handleToggle}>
									<Icon name='sidebar' />
								</Menu.Item>
								<Menu.Item position='right'>
									<Button as='a' inverted>
										Log in
									</Button>
									{/* <Button
										as='a'
										inverted
										style={{ marginLeft: '0.5em' }}>
										Sign Up
									</Button> */}
								</Menu.Item>
							</Menu>
						</Container>
						<HomepageHeading mobile />
					</Segment>

					{children}
				</Sidebar.Pusher>
			</Responsive>
		);
	}
}

MobileContainer.propTypes = {
	children : PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
	<div>
		<DesktopContainer>{children}</DesktopContainer>
		<MobileContainer>{children}</MobileContainer>
	</div>
);

ResponsiveContainer.propTypes = {
	children : PropTypes.node,
};

const HomepageLayout = () => (
	<ResponsiveContainer>
		<Segment style={{ padding: '8em 0em' }} vertical>
			<Grid container stackable verticalAlign='middle'>
				<Grid.Row>
					<Grid.Column width={8}>
						<Header as='h3' style={{ fontSize: '2em' }}>
							WHY CHOOSE US
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							<strong>
								With many years of experience in the
								Construction Electrician industry, we take pride
								in our professionalism, punctuality and
								customers service.
							</strong>
						</p>
						<p style={{ fontSize: '1.33em' }}>
							Our primary measure of success is customer
							satisfaction. We define customers as employees,
							partners and clients. Our intent is to earn and
							maintain the respect and trust of everyone we come
							in contact with when representing Emergency Electric
							c Inc.
						</p>
						<p style={{ fontSize: '1.33em' }}>
							We believe in a personal touch approach to making
							ourselves known in the market. Referral and repeat
							business is important to us. We want every customer
							to be 100% satisfied with our service and work. We
							are confident that we meet this goal and that is why
							we offer a 100% customer satisfaction guarantee.
						</p>
					</Grid.Column>
					<Grid.Column floated='right' width={6}>
						<Image bordered rounded size='large' src={Owner} />
					</Grid.Column>
				</Grid.Row>
				{/* <Grid.Row>
					<Grid.Column textAlign='center'>
						<Button size='huge'>Check Them Out</Button>
					</Grid.Column>
				</Grid.Row> */}
			</Grid>
		</Segment>
		<Segment style={{ padding: '0em' }} vertical>
			<Divider
				as='h4'
				className='header'
				horizontal
				style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
				<a href='#'>We Specialize in</a>
			</Divider>
			<Grid celled='internally' coloumns='equal' stackable>
				<Grid.Row text-align='center'>
					<Grid.Column
						width={5}
						style={{ paddingBottom: '5em', paddingTop: '5em' }}>
						<Header
							as='h3'
							textAlign='center'
							style={{ fontSize: '2em' }}>
							Residential
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							Emergency Electric Inc can assist with any type of
							residential renovation, whether you are building an
							extension to your home or installing pot lights in
							your condo.
						</p>
					</Grid.Column>
					<Grid.Column
						width={5}
						style={{ paddingBottom: '5em', paddingTop: '5em' }}>
						<Header
							as='h3'
							textAlign='center'
							style={{ fontSize: '2em' }}>
							Commercial
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							Emergency Electric Inc offers a variety of
							commercial services, by our commercial electrical
							contractors.
						</p>
					</Grid.Column>
					<Grid.Column
						width={5}
						style={{ paddingBottom: '5em', paddingTop: '5em' }}>
						<Header
							as='h3'
							textAlign='center'
							style={{ fontSize: '2em' }}>
							Industrial
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							Emergency Electric Inc offers a variety of
							industrial services by our industrial electrical
							contractors.
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
		<Segment style={{ padding: '0em' }} vertical>
			<Divider
				as='h4'
				className='header'
				horizontal
				style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
				<a href='#'>Testimonials</a>
			</Divider>
			<Grid celled='internally' columns='equal' stackable>
				<Grid.Row textAlign='center'>
					<Grid.Column
						style={{ paddingBottom: '5em', paddingTop: '5em' }}>
						<Header as='h3' style={{ fontSize: '2em' }}>
							"They were very efficent, prompt, and courteous."
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							They even did a little bit extra that they really
							didn't have to do. They were quick. I have used them
							twice now.
						</p>
					</Grid.Column>
					<Grid.Column
						style={{ paddingBottom: '5em', paddingTop: '5em' }}>
						<Header as='h3' style={{ fontSize: '2em' }}>
							"They do very good electrical work."
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							They are friendly, conscientious about their work,
							arrive on time, charge fair prices, and make good
							recommendations about our electrical service. I
							liked their personal touch, and helpful, attentive
							interest. I've used them twice and would use them
							again
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
		<Segment style={{ padding: '8em 0em' }} vertical>
			<Container text>
				<Header as='h3' style={{ fontSize: '2em' }}>
					Electrical Services
				</Header>
				<p style={{ fontSize: '1.33em' }}>
					We continue to provide repeat service to a number of
					satisfied customers in all areas. Progressive thinking and a
					highly skilled staff lead our company to look forward to
					upcoming and innovative projects with enthusiasm.
				</p>
				{/* <Button as='a' size='large'>
					Read More
				</Button> */}
				<Divider
					as='h4'
					className='header'
					horizontal
					style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
					<a href='#'>Our Goal</a>
				</Divider>

				<p style={{ fontSize: '1.33em' }}>
					We’re committed to excellence. Our goal is to exceed your
					expectations. Using our years of experience and expertise
					and by providing a dynamic and skilled team we will ensure
					your projects are a complete success. Our primary measure of
					success is customer satisfaction. We define customers as
					employees, partners and clients. Our intent is to earn and
					maintain the respect and trust of everyone we come in
					contact with when representing Emergency Electric Inc.
				</p>
				{/* <Button as='a' size='large'>
					I'm Still Quite Interested
				</Button> */}
			</Container>
		</Segment>
		<Segment inverted vertical style={{ padding: '5em 0em' }}>
			<Container>
				<Grid divided inverted stackable>
					<Grid.Row>
						<Grid.Column width={3}>
							<Header inverted as='h4' content='Location' />
							<List>
								<List.Item
									icon='users'
									content='Emergency Electric'
								/>
								<List.Item
									icon='marker'
									content='Lanesville, IN'
								/>
								<List.Item
									icon='mail'
									content={
										<a href='mailto:emergencyelectric@hotmail.com'>
											Email Us
										</a>
									}
								/>
							</List>
						</Grid.Column>
						<Grid.Column width={3}>
							<Image bordered rounded size='large' src={Logo} />
						</Grid.Column>
						<Grid.Column width={7}>
							<Header as='h4' inverted>
								Give us a call today!
							</Header>
							<p>
								Emergency Electric is the premier Electrical
								Contractor in the Kentucky and Indiana areas. We
								specialize in residential, as well as,
								commercial electrical service repair and
								restoration. We are fully insured with over 20
								years of experience
							</p>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<p style={{ fontSize: '0.75em' }}>
					<Icon name='copyright' />
					2019, Emergency Electric Inc
				</p>
			</Container>
		</Segment>
	</ResponsiveContainer>
);
export default HomepageLayout;
