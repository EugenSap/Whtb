using System;

using Microsoft.Extensions.Configuration;

using Xtensive.Orm.Configuration;
using Xtensive.Orm;

using Whtb.Models;

namespace Whtb.Services
{
    /// <summary>
    /// DomainBuilder
    /// </summary>
    public static class DomainBuilder
    {
        /// <summary>
        /// Собрать домен
        /// </summary>
        /// <param name="domain">domain</param>
        /// <param name="configuration">configuration</param>
        public static Domain BuildDomain(Domain domain, IConfiguration configuration)
        {
            string projectJsonContent = configuration.GetConnectionString("CompaniesDB");
            var sessionConfiguration = new SessionConfiguration("Default", SessionOptions.ClientProfile | SessionOptions.AutoActivation | SessionOptions.Default | SessionOptions.AutoSaveChanges);
            var config = new DomainConfiguration(projectJsonContent);
            config.UpgradeMode = DomainUpgradeMode.PerformSafely;
            config.Sessions.Add(sessionConfiguration);
            RegisterTypes(config);
            domain = Domain.Build(config);
            return domain;
            //RegisterFakeUsers(domain);
        }
        
        ////TODO : Заменить на рефлексию
        private static void RegisterTypes(DomainConfiguration config)
        {
            config.Types.Register(typeof(User).Assembly);
            config.Types.Register(typeof(Group).Assembly);
            config.Types.Register(typeof(Purchase).Assembly);
        }
    }
}
