import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Category from './components/Category';
import CreateCategory from './components/CreateCategory';
import CreateTask from './components/CreateTask';
import DailyTasks from './components/DailyTasks';
import Dashboard from './components/Dashboard';
import EditCategory from './components/EditCategory';
import EditTask from './components/EditTask';
import Login from './components/Login';
import PrivateRoutes from './components/PrivateRoutes';
import SignUp from './components/SignUp';
import Task from './components/Task';
import { useAuth } from './context/AuthContextProvider';
import CategoryContextProvider from './context/CategoryContextProvider';

function App() {
	const { state } = useAuth();

	return (
		<>
			<CategoryContextProvider>
				<BrowserRouter>
					<Routes>
						<Route
							path='/'
							element={
								<PrivateRoutes>
									<Dashboard />
								</PrivateRoutes>
							}
						/>
						<Route
							path='/login'
							element={
								state.token ? (
									<Navigate replace={false} to='/' />
								) : (
									<Login />
								)
							}
						/>
						<Route
							path='categories/create'
							element={
								<PrivateRoutes>
									<CreateCategory />
								</PrivateRoutes>
							}
						/>

						<Route
							path='categories/:id'
							element={
								<PrivateRoutes>
									<Category />
								</PrivateRoutes>
							}
						/>
						<Route
							path='categories/edit/:id'
							element={
								<PrivateRoutes>
									<EditCategory />
								</PrivateRoutes>
							}
						/>

						<Route
							path='tasks/:id'
							element={
								<PrivateRoutes>
									<Task />
								</PrivateRoutes>
							}
						/>

						<Route
							path='tasks/create/:category_id'
							element={
								<PrivateRoutes>
									<CreateTask />
								</PrivateRoutes>
							}
						/>

						<Route
							path='tasks/:id/edit'
							element={
								<PrivateRoutes>
									<EditTask />
								</PrivateRoutes>
							}
						/>

						<Route
							path='daily-tasks'
							element={
								<PrivateRoutes>
									<DailyTasks />
								</PrivateRoutes>
							}
						/>
						<Route
							path='/signup'
							element={
								state.token ? (
									<Navigate replace={true} to='/' />
								) : (
									<SignUp />
								)
							}
						/>
					</Routes>
				</BrowserRouter>
			</CategoryContextProvider>
		</>
	);
}

export default App;
