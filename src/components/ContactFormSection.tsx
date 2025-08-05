"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Button from "@/components/Button";

const contactSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("El email no es válido").min(1, "El email es obligatorio"),
  phone: z.string().optional(),
  project: z.string().optional(),
  message: z.string().min(1, "El mensaje es obligatorio")
});

const ContactFormSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    mode: "onChange"
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log("Datos validados:", data);
    alert("Formulario enviado:\n" + JSON.stringify(data, null, 2));
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-full max-w-md bg-[#transparent] rounded-xl shadow-lg p-8 flex flex-col justify-center h-full"
      autoComplete="off"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-5">
          {/* Nombre */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-semibold text-white mb-1">
              Nombre
            </label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Tu nombre completo"
              aria-invalid={!!errors.name}
              className="w-full bg-white border border-gray-300 focus:border-gray-900 text-gray-800"
              autoComplete="name"
            />
            <div className="min-h-[20px]">
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>
          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="tucorreo@ejemplo.com"
              aria-invalid={!!errors.email}
              className="w-full bg-white border border-gray-300 focus:border-gray-900 text-gray-800"
              autoComplete="email"
            />
            <div className="min-h-[20px]">
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-5">
          {/* Teléfono */}
          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-semibold text-white mb-1">
              Teléfono
            </label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="+54 11 1234-5678"
              aria-invalid={!!errors.phone}
              className="w-full bg-white border border-gray-300 focus:border-gray-900 text-gray-800"
              autoComplete="tel"
            />
            <div className="min-h-[20px]">
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>
          {/* Empresa/Proyecto */}
          <div className="space-y-1">
            <label htmlFor="project" className="block text-sm font-semibold text-white mb-1">
              Empresa/Proyecto
            </label>
            <Input
              id="project"
              {...register("project")}
              placeholder="Nombre de tu empresa/proyecto"
              aria-invalid={!!errors.project}
              className="w-full bg-white border border-gray-300 focus:border-gray-900 text-gray-800"
              autoComplete="organization"
            />
            <div className="min-h-[20px]">
              {errors.project && (
                <p className="text-sm text-red-600">{errors.project.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-1 md:col-span-2">
        <label htmlFor="message" className="block text-sm font-semibold text-white mb-1">
          Mensaje
        </label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Escribe tu mensaje"
          aria-invalid={!!errors.message}
          className="min-h-[100px] w-full bg-white border border-gray-300 focus:border-gray-900 text-gray-800"
        />
        <div className="min-h-[20px]">
          {errors.message && (
            <p className="text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center md:col-span-2">
        <Button
          type="submit"
          className="bg-[#000000] text-white font-bold rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center border border-primary w-full h-12 text-base cursor-pointer hover:bg-[#025159] hover:text-amber-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-80"
          style={{ fontSize: '1rem' }}
        >
          Enviar mensaje
        </Button>
      </div>
    </form>
  );
};

export default ContactFormSection;