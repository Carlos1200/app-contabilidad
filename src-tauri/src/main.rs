#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};

fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .plugin(TauriSql::default().add_migrations(
      "sqlite:test.db",
      vec![Migration {
        version: 1,
        description: "crear contabilidad",
        sql: include_str!("../migrations/1.sql"),
        kind: MigrationKind::Up,
      }],
    ))
    .menu(if cfg!(target_os = "macos") {
      tauri::Menu::os_default(&context.package_info().name)
    } else {
      tauri::Menu::default()
    })
    .run(context)
    .expect("error while running tauri application");
}
