using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Whtb.Utils
{
    /// <summary>
    /// ReflectionHelper
    /// </summary>
    public class ReflectionHelper
    {
        /// <summary>
        /// Получить все наследники интерфейса
        /// </summary>
        /// <typeparam name="T">интерфейс</typeparam>
        /// <returns>интерфейсы-наследники</returns>
        public static IEnumerable<Type> GetAllIntefaces<T>()
        {
            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes().Where(z => z.GetInterfaces().Contains(typeof(T)) && z.IsInterface));
        }

        /// <summary>
        /// Получить все реализации интерфейса
        /// </summary>
        /// <typeparam name="T">интерфейс</typeparam>
        /// <param name="type">интерфейс</param>
        /// <returns>реализации</returns>
        public static IEnumerable<Type> GetAllImplementations<T>(T type) where T : Type
        {
            var s = AppDomain.CurrentDomain.GetAssemblies();
            foreach (var s2 in s)
            {
                var q = s2.GetTypes();
            }

            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes()).Where(z => z.GetInterfaces().Contains(type) && z.IsClass);
        }

        /// <summary>
        /// Получить все реализации интерфейса
        /// </summary>
        /// <typeparam name="T">интерфейс</typeparam>
        /// <returns>реализации</returns>
        public static IEnumerable<Type> GetAllImplementations<T>() where T : Type
        {
            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes()).Where(z => z.GetInterfaces().Contains(typeof(T)) && z.IsClass);
        }

        /// <summary>
        /// Найти тип по имени
        /// </summary>
        /// <param name="typeName">имя типа</param>
        /// <returns>тип</returns>
        public static Type GetTypeByName(string typeName)
        {
            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes()).Where(z => z.FullName == typeName).First();
        }

        /// <summary>
        /// Получить все поля
        /// </summary>
        /// <typeparam name="T">тип</typeparam>
        /// <param name="type">тип</param>
        /// <returns>свойства</returns>
        public static IEnumerable<PropertyInfo> GetAllFields<T>(T type) where T : Type
        {
            return type.GetProperties();
        }

        /// <summary>
        /// Создать объект типа
        /// </summary>
        /// <typeparam name="T">тип</typeparam>
        /// <param name="type">тип</param>
        /// <returns>объект</returns>
        public static object CreateObject<T>(T type) where T : Type
        {
            ConstructorInfo info = type.GetConstructor(new Type[] { });
            object result = info.Invoke(new object[] { });
            return result;
        }
    }
}
