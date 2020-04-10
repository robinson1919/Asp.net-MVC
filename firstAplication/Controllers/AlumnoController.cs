using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace firstAplication.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarSexo()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Sexo.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDSEXO, p.NOMBRE });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarAlumnos()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Alumno.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new 
                { p.IIDALUMNO, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.TELEFONOMADRE }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarAlumnosPorSexo(int iidsexo)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Alumno.Where(p => p.BHABILITADO.Equals(1) && p.IIDSEXO.Equals(iidsexo))
                .Select(p => new
                { p.IIDALUMNO, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.TELEFONOMADRE }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int eliminar(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int nregistroAfectados = 0;
            try
            {
                Alumno oAlumno = bd.Alumno.Where(p => p.IIDALUMNO.Equals(id)).First();
                oAlumno.BHABILITADO = 0;
                bd.SubmitChanges();
                nregistroAfectados = 1;
            }
            catch(Exception ex)
            {
                nregistroAfectados = 0;
            }
            return nregistroAfectados;
        }
    }
}