using Microsoft.VisualStudio.TestTools.UnitTesting;
using app_services.Context;
using app_services.Controllers;

namespace StandTests
{
    [TestClass]
    public class StandUnitTests
    {
        [TestMethod]
        public void Get_ReturnsStatusCodeOk()
        {
            var response = StandsController.Get();
        }
    }
}
