using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace firstAplication.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarDocente()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1)).Select(
                p => new { p.IIDDOCENTE,
                            p.NOMBRE,
                            p.APPATERNO,
                            p.APMATERNO,
                            p.EMAIL}).ToList();
                

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarModalidadContacto()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = (bd.ModalidadContrato.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { IID =p.IIDMODALIDADCONTRATO, p.NOMBRE})).ToList();

                return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarDocente(int iidmodalidad)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1) 
            && p.IIDMODALIDADCONTRATO.Equals(iidmodalidad)).Select(
                p => new {
                    p.IIDDOCENTE,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.EMAIL
                }).ToList();


            return Json(lista, JsonRequestBehavior.AllowGet);
        }


    }
}