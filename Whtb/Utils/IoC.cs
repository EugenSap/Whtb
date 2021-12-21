using SimpleInjector;

namespace Whtb.Utils
{
    public class IoC
    {
        private static Container container;

        public static T GetInstance<T>() where T : class
        {
            container ??= new Container();
            return container.GetInstance<T>();
        }

        public static void Register<TService, TImplementation>() where TService : class where TImplementation : class, TService
        {
            container ??= new Container();
            container.Register<TService, TImplementation>();
        }
    }
}