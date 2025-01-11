import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          OralHUB
        </h2>
        <form>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Електрона пошта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Вкажіть електрону пошту"
              className="form-input w-full rounded-lg px-4 py-3"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Вкажіть пароль"
              className="form-input w-full rounded-lg px-4 py-3"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-uppercase w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-600"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
