import json
import os

class Tarea:
    def __init__(self, titulo, completada=False):
        self.titulo = titulo
        self.completada = completada

    def marcar_completada(self):
        self.completada = True

    def to_dict(self):
        return {
            "titulo": self.titulo,
            "completada": self.completada
        }


class GestorTareas:
    def __init__(self, archivo="tareas.json"):
        self.archivo = archivo
        self.tareas = self.cargar_tareas()

    def cargar_tareas(self):
        if os.path.exists(self.archivo):
            with open(self.archivo, "r") as f:
                data = json.load(f)
                return [Tarea(**t) for t in data]
        return []

    def guardar_tareas(self):
        with open(self.archivo, "w") as f:
            json.dump([t.to_dict() for t in self.tareas], f, indent=4)

    def agregar_tarea(self, titulo):
        self.tareas.append(Tarea(titulo))
        self.guardar_tareas()
        print("✅ Tarea agregada")

    def listar_tareas(self):
        if not self.tareas:
            print("📭 No hay tareas")
            return
        
        for i, tarea in enumerate(self.tareas, start=1):
            estado = "✔" if tarea.completada else "✘"
            print(f"{i}. [{estado}] {tarea.titulo}")

    def completar_tarea(self, indice):
        if 0 <= indice < len(self.tareas):
            self.tareas[indice].marcar_completada()
            self.guardar_tareas()
            print("🎉 Tarea completada")
        else:
            print("❌ Índice inválido")


def menu():
    gestor = GestorTareas()

    while True:
        print("\n--- MENÚ ---")
        print("1. Agregar tarea")
        print("2. Listar tareas")
        print("3. Completar tarea")
        print("4. Salir")

        opcion = input("Elige una opción: ")

        if opcion == "1":
            titulo = input("Escribe la tarea: ")
            gestor.agregar_tarea(titulo)

        elif opcion == "2":
            gestor.listar_tareas()

        elif opcion == "3":
            gestor.listar_tareas()
            try:
                num = int(input("Número de tarea a completar: ")) - 1
                gestor.completar_tarea(num)
            except ValueError:
                print("❌ Ingresa un número válido")

        elif opcion == "4":
            print("👋 Saliendo...")
            break

        else:
            print("❌ Opción inválida")


if __name__ == "__main__":
    menu()