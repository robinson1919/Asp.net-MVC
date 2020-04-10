using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace firstAplication.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public string mensaje()
        {
            return "Bienvenidos al curso de ASP.NET MVC";
        }

        public JsonResult recuperarDatos(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1)
            && p.IIDCURSO.Equals(id))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        //public string saludo(string nombre)
        //{
        //    return "Hola como estas " + nombre;
        //}

        //public string nombreCompleto(string nombre, string apellido)
        //{
        //    return "Hola como estas " + nombre+" "+apellido;
        //}

        public JsonResult listarCurso()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION, p.BHABILITADO }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
            
        }

        public JsonResult buscarCursoPorNombre(string nombre )
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && 
                (p.NOMBRE.Contains(nombre) || p.DESCRIPCION.Contains(nombre) || p.IIDCURSO.ToString().Contains(nombre)))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(Curso gcurso)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int nregistrosAfectados = 0;
            try
            {
                //nuevo
                if (gcurso.IIDCURSO == 0)
                {
                    bd.Curso.InsertOnSubmit(gcurso);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
                //editar
                else
                {
                    Curso cursoSel = bd.Curso.Where(p => p.IIDCURSO.Equals(gcurso.IIDCURSO)).First();
                    cursoSel.NOMBRE = gcurso.NOMBRE;
                    cursoSel.DESCRIPCION = gcurso.DESCRIPCION;
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
            }
            catch(Exception ex)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }

        public int eliminarCurso(Curso gcurso)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int nregistrosAfectados = 0;
            try
            {
                Curso cursoSel = bd.Curso.Where(p => p.IIDCURSO.Equals(gcurso.IIDCURSO)).First();
                cursoSel.BHABILITADO = gcurso.BHABILITADO;
                bd.SubmitChanges();
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }    
    }
}